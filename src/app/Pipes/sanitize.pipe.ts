import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { ImageUtil } from "../utilities/image-util";
@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private imgUtil: ImageUtil){}
  transform(value: ArrayBuffer, prefix): unknown {
    console.log(value)
    return this.sanitizer.bypassSecurityTrustResourceUrl(prefix + this.imgUtil.getBase64(value));
  }

}
