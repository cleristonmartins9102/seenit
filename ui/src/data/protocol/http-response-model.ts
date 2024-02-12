export interface HttpResponse<bodyType> {
  statusCode: number
  body: bodyType
}
