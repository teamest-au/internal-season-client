const grpc = require('@grpc/grpc-js');

import {
  GrpcPackaging,
  GrpcServices,
  GrpcTypes,
  ServiceTypes,
} from '@teamest/internal-season-common';
import { TeamSeason } from '@teamest/models/processed';

export default class InternalSeasonClient {
  client: GrpcServices.SeasonClient;

  constructor(service_uri: string) {
    this.client = new GrpcServices.SeasonClient(
      service_uri,
      grpc.credentials.createInsecure(),
    );
  }

  async updateTeamSeason(
    teamSeason: TeamSeason,
  ): Promise<ServiceTypes.UpdateTeamSeasonResult> {
    const packagedTeamSeason = GrpcPackaging.packageTeamSeason(teamSeason);
    return new Promise((resolve, reject) => {
      this.client.updateTeamSeason(
        packagedTeamSeason,
        (err, result: GrpcTypes.UpdateTeamSeasonResult | undefined) => {
          if (err) reject(err);
          if (!result) {
            reject('No result');
          } else {
            const unpacked = GrpcPackaging.unpackageUpdateTeamSeasonResult(
              result,
            );
            resolve(unpacked);
          }
        },
      );
    });
  }
}
