import { 
  Injectable
} from '@nestjs/common'
import { Report } from './report.entity'
import { CreateReportDto } from './dtos/create-report.dto'

@Injectable()
export class ReportsService {

  createReport(report: CreateReportDto) {
    return report
  }
}
