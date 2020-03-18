import { TestBed } from "@angular/core/testing";

import { FacebookPixelService } from "./facebook-pixel.service";

describe("FacebookPixelServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: FacebookPixelService = TestBed.get(FacebookPixelService);
    expect(service).toBeTruthy();
  });
});
