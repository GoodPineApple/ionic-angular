import { TestBed } from "@angular/core/testing";

import { IonLoadingService } from "./ion-loading.service";

describe("IonLoadingService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: IonLoadingService = TestBed.get(IonLoadingService);
    expect(service).toBeTruthy();
  });
});
