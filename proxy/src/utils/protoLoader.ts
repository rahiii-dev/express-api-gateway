import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import environment from '../config/environment';

export const loadProto = (protoFileName: string): any => {
  const protoPath = environment.env === "development" 
    ? path.resolve(`../_proto/${protoFileName}`) 
    : path.resolve(__dirname, `../_proto/${protoFileName}`);
    
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  return grpc.loadPackageDefinition(packageDefinition);
};
