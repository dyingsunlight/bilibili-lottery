import { inject } from "vue"
import { AppService } from "../services/app"

export const useService = () => {
  return {
    service: inject<AppService>('service')
  }
}
