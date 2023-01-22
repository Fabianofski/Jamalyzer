export type jam = {
  title : string,
  banner : string,
  id : number,
  url : string,
  hosts : host[],
  color : string,
  secondary_color : string,
  bg_color : string,
  entries : string,
  ratings : string,
  started : Date,
  ended : Date,
  twitter : {hashtag:string, twitter_link:string}
}

export type host = {
  username : string,
  profile_link : string,
}