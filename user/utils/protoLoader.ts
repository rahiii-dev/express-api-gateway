import path from 'path';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import environment from '../src/config/environment';

export const loadProto = (protoFileName: string): any => {
  const protoPath = environment.env === "development" ? `../../_proto/${protoFileName}` : '../_proto/${protoFileName}';

  const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname, protoPath),
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