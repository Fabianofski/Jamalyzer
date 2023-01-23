export type jam = {
  Title : string,
  banner : string,
  id : number,
  url : string,
  hosts : host[],
  color : string,
  secondary_color : string,
  bg_color : string,
  entries : string,
  ratings : string,
  started : string,
  ended : string,
  twitter : {hashtag:string, twitter_link:string}
}

export type host = {
  username : string,
  profile_link : string,
}