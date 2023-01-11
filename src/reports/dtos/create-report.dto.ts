import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator'

const now = Date.now()
const currentYear = new Date(now).getFullYear()

export class CreateReportDto {
  price: number

  @IsString()  
  make: string

  @IsString()
  model: string

  @IsLongitude()
  lng: number

  @IsLatitude()
  lat: number

  @IsNumber()
  @Min(1930)
  @Max(currentYear)
  year: number

  @IsNumber()
  @Min(0)
  @Max(500000)
  mileage: number
}