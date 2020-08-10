const grpc = require('@grpc/grpc-js');

import {
  GrpcPackaging,
  GrpcServices,
  GrpcTypes,
  ServiceTypes,
} from '@teamest/internal-season-common';

export default class InternalSeasonClient {
  client: GrpcServices.SeasonClient;

  constructor(service_uri: string) {
    this.client = new GrpcServices.SeasonClient(
      service_uri,
      grpc.credentials.createInsecure(),
    );
  }

  async updateTeamSeason(
    updateTeamSeasonRequest: ServiceTypes.UpdateTeamSeasonRequest,
  ): Promise<ServiceTypes.UpdateTeamSeasonResponse> {
    const packagedRequest = GrpcPackaging.packageUpdateTeamSeasonRequest(updateTeamSeasonRequest);
    return new Promise((resolve, reject) => {
      this.client.updateTeamSeason(
        packagedRequest,
        (err, result: GrpcTypes.UpdateTeamSeasonResponse | undefined) => {
          if (err) reject(err);
          if (!result) {
            reject('No result');
          } else {
            const unpacked = GrpcPackaging.unpackageUpdateTeamSeasonResponse(
              result,
            );
            resolve(unpacked);
          }
        },
      );
    });
  }

  async getSeasonsForTeam(getSeasonsForTeamRequest: ServiceTypes.GetSeasonsForTeamRequest): Promise<ServiceTypes.GetSeasonsForTeamResponse> {
    const packagedRequest = GrpcPackaging.packageGetSeasonsForTeamRequest(getSeasonsForTeamRequest);
    return new Promise((resolve, reject) => {
      this.client.getSeasonsForTeam(
        packagedRequest,
        (err, result: GrpcTypes.GetSeasonsForTeamResponse | undefined) => {
          if (err) reject(err);
          if (!result) {
            reject('No result');
          } else {
            const unpacked = GrpcPackaging.unpackageGetSeasonsForTeamResponse(
              result,
            );
            resolve(unpacked);
          }
        },
      );
    });
  }
}
