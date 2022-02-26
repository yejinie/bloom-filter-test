import { Injectable } from '@nestjs/common';
import { BloomFilter } from 'bloom-filters';

@Injectable()
export class AppService {
  create() {
    const fs = require('fs');
    const bf = new BloomFilter(16, 3);
    const exported = bf.saveAsJSON();
    const data = JSON.stringify(exported);
    fs.writeFile('bloomfilter.json', data, function(err, result) {
      if(err) console.log('error', err); });
  }

  check(sign: string) {
    const fs = require('fs');
    const obj = JSON.parse(fs.readFileSync('bloomfilter.json', 'utf8'))
    const bf = BloomFilter.fromJSON(obj)
    const has = bf.has(sign);
    if (has === false) {
      bf.add(sign);
      const exported = bf.saveAsJSON();
      const data = JSON.stringify(exported);
      fs.writeFile('bloomfilter.json', data, function(err, result) {
        if(err) console.log('error', err); });
      return "true";
    } else {
      return "false";
    }
  }
}
