import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommissionBonusGroupEntity } from '../entities/commission-bonus-group.entity';
import { CommissionProfileEntity as CommissionProfileEntity } from '../entities/commission-profile.entity';
import { CommissionProfileTurnoverEntity } from '../entities/commission-turnover.entity';
import { NormalPayoutEntity } from '../entities/normal-payout.entity';
import { CommissionEntity } from '../entities/commission.entity';
import { UserCommissionProfileEntity } from '../entities/user-commission-profile.entity';
import {
  AssignUserCommissionProfile,
  BonusGroupResponse,
  BonusGroups,
  CommissionProfileResponse,
  CommissionProfilesResponse,
  CommissionProfile,
  Empty,
  NormalResponse,
  PayPowerRequest,
  PowerBonusResponse,
  PowerRequest,
  PowerResponse,
  RetailServiceClient,
  PayNormalRequest,
  PayNormalResponse,
  GetNormalRequest,
  Meta,
} from './retail.pb';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RetailService implements RetailServiceClient {
  constructor(
    @InjectRepository(CommissionEntity)
    private commissionRepository: Repository<CommissionEntity>,
    @InjectRepository(CommissionProfileEntity)
    private commissionProfileRepository: Repository<CommissionProfileEntity>,
    @InjectRepository(CommissionProfileTurnoverEntity)
    private commissionProfileTurnoverRepository: Repository<CommissionProfileTurnoverEntity>,
    @InjectRepository(CommissionBonusGroupEntity)
    private commissionBonusGroupRepository: Repository<CommissionBonusGroupEntity>,
    @InjectRepository(UserCommissionProfileEntity)
    private userCommissionProfileRepository: Repository<UserCommissionProfileEntity>,
    @InjectRepository(NormalPayoutEntity)
    private normalPayoutRepository: Repository<NormalPayoutEntity>,
  ) {}
  async getBonusGroups(request: Empty): Promise<BonusGroupResponse> {
    const resp = await this.commissionBonusGroupRepository.find(request);
    const response: BonusGroupResponse = {
      success: true,
      message: 'Commission Groups Bonus Retrieved successfully',
      data: resp,
    };
    return response;
  }
  async createBonusGroups(data: BonusGroups): Promise<BonusGroupResponse> {
    console.log(`BG Length: ${data.bonusGroups.length}`);
    if (data.bonusGroups.length !== 4) {
      return {
        success: false,
        message: 'Four Groups allowed for creation or overriding',
        data: [],
      };
    }

    const gbArray: CommissionBonusGroupEntity[] = [];
    let prevGB: CommissionBonusGroupEntity | null = null;

    for (const bg of data.bonusGroups) {
      if (prevGB && Number(bg.minSel) <= Number(prevGB.maxSel)) {
        console.log(`Min Sel: ${bg.minSel}, Max Sel: ${prevGB.maxSel}`);
        return {
          success: false,
          message: `Min Selection of ${Number(bg.minSel)} on group ${bg.group} cannot be Less or equal to Max Selection ${Number(prevGB.maxSel)} on group ${prevGB.group}`,
          data: [],
        };
      }

      let bgRecord: CommissionBonusGroupEntity =
        await this.commissionBonusGroupRepository.findOneBy({
          group: bg.group,
        });

      if (bgRecord) {
        await this.commissionBonusGroupRepository.update(bgRecord.id, bg);
      } else {
        // Insert logic here
        bgRecord = await this.commissionBonusGroupRepository.save({
          group: bg.group,
          minSel: bg.minSel,
          maxSel: bg.maxSel,
          rateIsLess: bg.rateIsLess,
          rateIsMore: bg.rateIsMore,
          rate: bg.rate,
          targetStake: bg.targetStake,
          targetCoupon: bg.targetCoupon,
        });
      }

      gbArray.push(bgRecord);
      prevGB = bgRecord;
    }

    return {
      success: true,
      message: 'Commission Group Bonus Updated successfully',
      data: gbArray,
    };
  }

  async getCommissionProfiles({
    currentPage,
    itemsPerPage,
  }: Meta): Promise<CommissionProfilesResponse> {
    currentPage = currentPage || 1;
    itemsPerPage = itemsPerPage || 10; // Adjust the number of items per page as needed
    const skip = (currentPage - 1) * itemsPerPage;

    const [commissionProfiles, totalCount] =
      await this.commissionProfileRepository.findAndCount({
        order: { createdAt: 'DESC' }, // Adjust the order as needed
        skip,
        take: itemsPerPage,
      });

    const totalPages = Math.ceil(totalCount / itemsPerPage);
    console.log(`totalCount  : ${totalCount}`);

    const response: CommissionProfilesResponse = {
      success: true,
      message: 'Commission Profiles Retrieved Successfully',
      data: commissionProfiles,
      meta: {
        total: totalCount,
        totalPages,
        currentPage,
        itemsPerPage,
      },
    };

    return response;
  }
  async createCommissionProfile(
    data: CommissionProfile,
  ): Promise<CommissionProfileResponse> {
    await this.commissionProfileRepository.save(data);
    const response: CommissionProfileResponse = {
      success: true,
      message: 'Commission Profiles Saved Successfully',
      data: data,
    };
    return response;
  }

  async updateCommissionProfile(
    data: CommissionProfile,
  ): Promise<CommissionProfileResponse> {
    // Find existing commission profile by ID
    const hasCommissionProfile =
      await this.commissionProfileRepository.findOneBy({
        id: data.id,
      });

    // Check if the profile exists
    if (!hasCommissionProfile) {
      throw new Error('Profile does not exist');
    }

    // Check if turnovers have changed
    if (data.turnovers !== hasCommissionProfile.turnovers) {
      // Remove Existing Turnovers
      await Promise.all(
        hasCommissionProfile.turnovers.map(async (turnover) => {
          await this.commissionProfileTurnoverRepository.remove(turnover);
        }),
      );

      // Create/Update New Turnovers
      const newTurnovers = data.turnovers.map((turnover) => {
        const existingTurnover = hasCommissionProfile.turnovers.find(
          (t) => t.event === turnover.event,
        );

        if (existingTurnover) {
          // Update existing turnover if needed
          existingTurnover.percentage = turnover.percentage;
          existingTurnover.maxOdd = turnover.maxOdd;
          existingTurnover.minOdd = turnover.minOdd;
          existingTurnover.oddSet = turnover.oddSet;
          return existingTurnover;
        }

        // Create a new turnover if it doesn't exist
        const newTurnover = new CommissionProfileTurnoverEntity();
        newTurnover.event = turnover.event;
        newTurnover.commissionProfile = hasCommissionProfile;
        newTurnover.percentage = turnover.percentage;
        newTurnover.maxOdd = turnover.maxOdd;
        newTurnover.minOdd = turnover.minOdd;
        newTurnover.oddSet = turnover.oddSet;
        return newTurnover;
      });

      // Update the profile's turnovers
      hasCommissionProfile.turnovers =
        newTurnovers || hasCommissionProfile.turnovers;
    }

    // Update other profile properties
    hasCommissionProfile.name = data.name || hasCommissionProfile.name;
    hasCommissionProfile.default = data.default || hasCommissionProfile.default;
    hasCommissionProfile.description =
      data.description || hasCommissionProfile.description;
    hasCommissionProfile.providerGroup =
      data.providerGroup || hasCommissionProfile.providerGroup;
    hasCommissionProfile.percentage =
      data.percentage || hasCommissionProfile.percentage;
    hasCommissionProfile.commissionType =
      data.commissionType || hasCommissionProfile.commissionType;

    // Save the updated profile
    await this.commissionProfileRepository.save(hasCommissionProfile);

    // Return a success response
    const response: CommissionProfileResponse = {
      success: true,
      message: 'Commission Profile Updated Successfully',
      data,
    };
    return response;
  }

  async assignUserCommissionProfile(
    data: AssignUserCommissionProfile,
  ): Promise<CommissionProfileResponse> {
    try {
      // Validate request
      const { userId, profileId } = data;

      if (!userId || !profileId) {
        throw new BadRequestException(
          'Both userId and commissionProfileId are required.',
        );
      }

      const profile = await this.commissionProfileRepository.findOneBy({
        id: profileId,
      });

      if (!profile) {
        throw new NotFoundException('Profile or user not found');
      }

      // TODO: CHECK IF USER IS AGENT (Add logic here)

      // Check if the user already has the profile assigned
      const existingAssignment =
        await this.userCommissionProfileRepository.findOne({
          where: { userId: userId, commissionProfileId: profile.id },
        });

      if (existingAssignment) {
        throw new BadRequestException(
          'User already has this profile assigned.',
        );
      }

      // Assign the profile to the user
      const userCommissionProfile = this.userCommissionProfileRepository.create(
        {
          userId,
          commissionProfileId: profile.id,
        },
      );

      await this.userCommissionProfileRepository.save(userCommissionProfile);

      return {
        success: true,
        message: 'Profile successfully assigned to user',
        data: profile,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Internal server error',
        data: null,
      };
    }
  }
  async getPowerBonus(data: PowerRequest): Promise<PowerBonusResponse> {
    console.log(data);
    throw new Error('Method not implemented.');
  }
  async payOutPowerBonus(data: PayPowerRequest): Promise<PowerResponse> {
    console.log(data);
    throw new Error('Method not implemented.');
  }

  async getNormalBonus({
    fromDate,
    toDate,
    provider,
    meta,
  }: GetNormalRequest): Promise<NormalResponse> {
    const page = meta.currentPage || 1;
    const itemsPerPage = meta.itemsPerPage || 10; // Adjust the number of items per page as needed
    const skip = (meta.currentPage - 1) * itemsPerPage;

    const [payout, totalCount] = await this.normalPayoutRepository.findAndCount(
      {
        where: {
          createdAt: Between(fromDate, toDate),
          profileGroup: provider,
        },
        order: { createdAt: 'DESC' }, // Adjust the order as needed
        skip,
        take: itemsPerPage,
      },
    );

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const response: NormalResponse = {
      success: true,
      message: 'Pay this users the following amount as commission',
      data: payout,
      meta: {
        total: totalCount,
        totalPages,
        currentPage: page,
        itemsPerPage,
      },
    };

    return response;
  }
  async payOutNormalBonus(data: PayNormalRequest): Promise<PayNormalResponse> {
    console.log(data);
    try {
      const existingPayout = await this.normalPayoutRepository.findOne({
        where: { betId: data.betId },
      });
      if (existingPayout) {
        if (existingPayout.isPaid) {
          throw new Error('This bet commission has been marked as paid');
        }
        existingPayout.isPaid = true;
        await this.normalPayoutRepository.save(existingPayout);
        const response: PayNormalResponse = {
          success: true,
          message: 'Pay user the following amount as bet commission',
          data: existingPayout.commission,
        };
        return response;
      }
    } catch (error) {
      throw new BadRequestException(error.message || 'Internal server error');
    }
  }

  async calculateNormalBonus(
    data: PayNormalRequest,
  ): Promise<PayNormalResponse> {
    try {
      const existingPayout = await this.normalPayoutRepository.findOne({
        where: { betId: data.betId },
      });
      if (existingPayout) {
        const response: PayNormalResponse = {
          success: true,
          message: 'Commission Calculated Successfully',
          data: existingPayout.commission,
        };
        return response;
      }
      const agentUCP = await this.userCommissionProfileRepository.findOne({
        where: { userId: data.cashierId, provider: data.profileGroup },
      });
      const commissionProfile = await this.commissionProfileRepository.findOne({
        where: { id: agentUCP.commissionProfileId },
      });
      if (!agentUCP || !agentUCP.commissionProfileId) {
        throw new NotFoundException('User or profile not found');
      }

      let commission = 0;

      const turnover = await this.commissionProfileTurnoverRepository.findOne({
        where: {
          event: data.selectionsCount,
          commissionProfile: {
            id: commissionProfile.id,
          },
        },
      });

      if (turnover) {
        if (turnover.oddSet) {
          if (
            data.totalOdds > turnover.minOdd &&
            data.totalOdds < turnover.maxOdd
          ) {
            commission = (data.stake * turnover.percentage) / 100;
          }
        } else {
          commission = (data.stake * turnover.percentage) / 100;
        }
      }
      // Assign the profile to the user
      const normalPayout = this.normalPayoutRepository.create({
        betId: data.betId,
        selectionsCount: data.selectionsCount,
        totalOdds: data.totalOdds,
        stake: data.stake,
        cashierId: data.cashierId,
        profileId: data.profileId,
        profileGroup: data.profileGroup,
      });

      await this.normalPayoutRepository.save(normalPayout);

      const response: PayNormalResponse = {
        success: true,
        message: 'Commission Calculated Successfully',
        data: commission,
      };
      return response;
    } catch (error) {
      throw new BadRequestException(error.message || 'Internal server error');
    }
  }
}
