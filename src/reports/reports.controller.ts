import { 
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { ReportsService } from './reports.service'
import { CreateReportDto } from './dtos/create-report.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from '../users/user.entity'

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReport(
    @Body() body: CreateReportDto,
    @Req() req: Request
  ) {
    const user = req.user as User
    return this.reportsService.createReport(body, user)
  }
}
