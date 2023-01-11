import { 
  Injectable
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Report } from './report.entity'
import { CreateReportDto } from './dtos/create-report.dto'
import { User } from '../users/user.entity'

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private Report: Repository<Report>,
    @InjectRepository(User) private User: Repository<User>
  ) {}

  createReport(report: CreateReportDto, user: User) {
    const newReport = this.Report.create({ ...report })
    newReport.user = user
    
    return this.Report.save(newReport)
  }

  async getReports(userId: number) {
    const user = await this.User.findOne(
      { 
        where: { 
          id: userId 
        },
        relations: ['reports']
      },
    )

    return user.reports
  }
}
