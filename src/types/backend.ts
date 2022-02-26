export interface Response<T extends object> {
  code: string
  type: "error" | "success"
  data: T  
}
