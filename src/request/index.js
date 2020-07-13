import axios from "axios";
export function request (config){
  let instence = axios.create({
    timeout:5000,
  });
  return instence(config)
}