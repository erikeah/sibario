import { Test, TestingModule } from '@nestjs/testing';
import { EnvVarsConfig } from './env-vars-config';

describe('EnvVarsConfig', () => {
  let provider: EnvVarsConfig;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvVarsConfig],
    }).compile();

    provider = module.get<EnvVarsConfig>(EnvVarsConfig);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
