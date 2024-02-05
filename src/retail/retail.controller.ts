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
  BetData,
  Response,
} from 'src/retail/retail.pb';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('retail')
export class RetailController implements RetailServiceController {
  constructor(private readonly retailService: RetailService) {}

  @GrpcMethod('RetailService', 'onBetPlaced')
  onBetPlaced(
    request: BetData,
  ): Response | Promise<Response> | Observable<Response> {
    try {
      console.log('onBetPlaced');
      console.log(request);
      return this.retailService.onBetPlaced(request);
    } catch (error) {
      console.error(error.message);
    }
  }
  @GrpcMethod('RetailService', 'onBetSettled')
  onBetSettled(
    request: BetData,
  ): Response | Promise<Response> | Observable<Response> {
    try {
      console.log('onBetSettled');
      console.log(request);
      return this.retailService.onBetSettled(request);
    } catch (error) {
      console.error(error.message);
    }
  }
  @GrpcMethod('RetailService', 'onBetCancelled')
  onBetCancelled(
    request: BetData,
  ): Response | Promise<Response> | Observable<Response> {
    try {
      console.log('onBetCancelled');
      console.log(request);
      return this.retailService.onBetCancelled(request);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get Bonus Groups
  @GrpcMethod('RetailService', 'getBonusGroups')
  getBonusGroups(data: Empty): BonusGroupResponse | any {
    try {
      console.log('getBonusGroups');
      console.log(data);
      return this.retailService.getBonusGroups(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Create Bonus Groups
  @GrpcMethod('RetailService', 'createBonusGroups')
  createBonusGroups(data: BonusGroups): BonusGroupResponse | any {
    try {
      console.log('createBonusGroups');
      console.log(data);
      return this.retailService.createBonusGroups(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  // Get Commission Profiles
  @GrpcMethod('RetailService', 'getCommissionProfiles')
  getCommissionProfiles(data: Meta): CommissionProfilesResponse | any {
    try {
      console.log('getCommissionProfiles');
      console.log(data);
      return this.retailService.getCommissionProfiles(data);
    } catch (error) {
      console.error(error.message);
    }
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

  // Create Power Bonus
  @GrpcMethod('RetailService', 'createPowerBonus')
  createPowerBonus(data: PowerRequest): PowerBonusResponse | any {
    console.log(data);
    return this.retailService.createPowerBonus(data);
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
