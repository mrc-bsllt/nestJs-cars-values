import { 
  Injectable
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Report } from './report.entity'
import { CreateReportDto } from './dtos/create-report.dto'

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private Report: Repository<Report>
  ) {}

  createReport(report: CreateReportDto) {
    const newReport = this.Report.create({ ...report })

    return this.Report.save(newReport)
  }
}
