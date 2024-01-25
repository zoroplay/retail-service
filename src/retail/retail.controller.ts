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
} from 'src/retail/retail.pb';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('retail')
export class RetailController implements RetailServiceController {
  constructor(private readonly retailService: RetailService) {}

  // Get Bonus Groups
  @GrpcMethod('RetailService', 'getBonusGroups')
  getBonusGroups(data: Empty): BonusGroupResponse | any {
    console.log('we made it here');
    console.log(data);
    return this.retailService.getBonusGroups(data);
  }

  // Create Bonus Groups
  @GrpcMethod('RetailService', 'createBonusGroups')
  createBonusGroups(data: BonusGroups): BonusGroupResponse | any {
    console.log(data);
    return this.retailService.createBonusGroups(data);
  }

  // Get Commission Profiles
  @GrpcMethod('RetailService', 'getCommissionProfiles')
  getCommissionProfiles(data: Meta): CommissionProfilesResponse | any {
    console.log(data);
    return this.retailService.getCommissionProfiles(data);
  }

  // Create Commission Profile
  @GrpcMethod('RetailService', 'createCommissionProfile')
  createCommissionProfile(
    data: CommissionProfile,
  ): CommissionProfileResponse | any {
    console.log(data);
    return this.retailService.createCommissionProfile(data);
  }

  // Update Commission Profile
  @GrpcMethod('RetailService', 'updateCommissionProfile')
  updateCommissionProfile(
    data: CommissionProfile,
  ): CommissionProfileResponse | any {
    console.log(data);
    return this.retailService.updateCommissionProfile(data);
  }

  // Assign User Commission Profile
  @GrpcMethod('RetailService', 'assignUserCommissionProfile')
  assignUserCommissionProfile(
    data: AssignUserCommissionProfile,
  ): CommissionProfileResponse | any {
    console.log(data);
    return this.retailService.assignUserCommissionProfile(data);
  }

  // Get Power Bonus
  @GrpcMethod('RetailService', 'getPowerBonus')
  getPowerBonus(data: PowerRequest): PowerBonusResponse | any {
    console.log(data);
    return this.retailService.getPowerBonus(data);
  }

  // Pay Out Power Bonus
  @GrpcMethod('RetailService', 'getPowerBonus')
  payOutPowerBonus(data: PayPowerRequest): PowerResponse | any {
    console.log(data);
    return this.retailService.payOutPowerBonus(data);
  }

  // Get Normal Bonus
  @GrpcMethod('RetailService', 'getNormalBonus')
  getNormalBonus(data: GetNormalRequest): NormalResponse | any {
    console.log(data);
    return this.retailService.getNormalBonus(data);
  }

  // Calculate Normal Bonus
  @GrpcMethod('RetailService', 'calculateNormalBonus')
  calculateNormalBonus(data: PayNormalRequest): PayNormalResponse | any {
    console.log(data);
    return this.retailService.calculateNormalBonus(data);
  }

  // Payout Normal bonus
  @GrpcMethod('RetailService', 'payOutNormalBonus')
  payOutNormalBonus(data: PayNormalRequest): PayNormalResponse | any {
    console.log(data);
    return this.retailService.payOutNormalBonus(data);
  }
}
