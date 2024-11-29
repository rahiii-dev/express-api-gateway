import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

export const loadProto = (protoFileName: string): any => {
  const protoPath = path.resolve(__dirname, `../proto/${protoFileName}`)
  
  const packageDefinition = protoLoader.loadSync(
    protoPath,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    }
  );
  return grpc.loadPackageDefinition(packageDefinition);
};