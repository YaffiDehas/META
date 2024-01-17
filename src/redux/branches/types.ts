export const enum LoadingState {
  IDLE = "IDLE",
  REQUEST = "REQUEST",
  SUCCESS = "DONE",
  FAILURE = "FAILURE"
}

export interface Store {
  store_id: number,
  store_region: string,
  store_title: string,
  store_address: string,
  store_phone: string,
  gps_location: string,
  emp_in_need: boolean,
  emp_interview: string,
  emp_contact: string,
  features: number,
  city: string,
  zip_code: string
}
export interface StoresState {
  loading: LoadingState
  branches: Store[]
}