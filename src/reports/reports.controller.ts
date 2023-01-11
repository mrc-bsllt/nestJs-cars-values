import { 
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common'
import { ReportsService } from './reports.service'
import { CreateReportDto } from './dtos/create-report.dto'
import { Report } from './report.entity'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.createReport(body)
  }
}
