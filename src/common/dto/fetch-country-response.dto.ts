import { ApiProperty } from "@nestjs/swagger";

export class FetchCountryResponseDto {
  @ApiProperty({ example: "countries fetched successfully" })
  message: string;

  @ApiProperty({
    example: [
      {
        name: "Nigeria",
        id: "5d987c3bfb881ec86b476bcc",
        curryencySymbol: "N",
        currencyCode: "NGN",
        countryCode: "NG",
      },
      {
        name: "United States of America",
        id: "5d987c3bfb881ec86b476bcc",
        curryencySymbol: "$",
        currencyCode: "USD",
        countryCode: "US",
      },
    ],
    nullable: true,
  })
  data: any;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  status: number;
}
