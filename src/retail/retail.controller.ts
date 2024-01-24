import { Controller } from '@nestjs/common';
import { RetailService } from './retail.service';
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
  RetailServiceController,
  GetNormalRequest,
  Meta,
  PayNormalRequest,
  PayNormalResponse,
} from 'src/proto/retail.pb';

@Controller('retail')
export class RetailController implements RetailServiceController {
  constructor(private readonly retailService: RetailService) {}

  // Get Bonus Groups
  async getBonusGroups(data: Empty): Promise<BonusGroupResponse> {
    console.log(data);
    return await this.retailService.getBonusGroups(data);
  }

  // Create Bonus Groups
  async createBonusGroups(data: BonusGroups): Promise<BonusGroupResponse> {
    console.log(data);
    return await this.retailService.createBonusGroups(data);
  }

  // Get Commission Profiles
  async getCommissionProfiles(data: Meta): Promise<CommissionProfilesResponse> {
    console.log(data);
    return await this.retailService.getCommissionProfiles(data);
  }

  // Create Commission Profile
  async createCommissionProfile(
    data: CommissionProfile,
  ): Promise<CommissionProfileResponse> {
    console.log(data);
    return await this.retailService.createCommissionProfile(data);
  }

  // Update Commission Profile
  async updateCommissionProfile(
    data: CommissionProfile,
  ): Promise<CommissionProfileResponse> {
    console.log(data);
    return await this.retailService.updateCommissionProfile(data);
  }

  // Assign User Commission Profile
  async assignUserCommissionProfile(
    data: AssignUserCommissionProfile,
  ): Promise<CommissionProfileResponse> {
    console.log(data);
    return await this.retailService.assignUserCommissionProfile(data);
  }

  // Get Power Bonus
  async getPowerBonus(data: PowerRequest): Promise<PowerBonusResponse> {
    console.log(data);
    return await this.retailService.getPowerBonus(data);
  }

  // Pay Out Power Bonus
  async payOutPowerBonus(data: PayPowerRequest): Promise<PowerResponse> {
    console.log(data);
    return await this.retailService.payOutPowerBonus(data);
  }

  // Get Normal Bonus
  async getNormalBonus(data: GetNormalRequest): Promise<NormalResponse> {
    console.log(data);
    return await this.retailService.getNormalBonus(data);
  }

  // Calculate Normal Bonus
  async calculateNormalBonus(
    data: PayNormalRequest,
  ): Promise<PayNormalResponse> {
    console.log(data);
    return await this.retailService.calculateNormalBonus(data);
  }

  // Payout Normal bonus
  async payOutNormalBonus(data: PayNormalRequest): Promise<PayNormalResponse> {
    console.log(data);
    return await this.retailService.payOutNormalBonus(data);
  }
}
