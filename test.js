// node test.js — checks scoring logic embedded in index.html
const fs=require('fs');const h=fs.readFileSync(__dirname+'/index.html','utf8');
eval(h.match(/function score[\s\S]*?\n}\n/)[0]+h.match(/function verdict[\s\S]*?\n}\n/)[0]);
const a=require('assert');let r;
r=score([{dir:1,str:5},{dir:-1,str:5},{dir:0,str:3}]);a.equal(r.score,0);a.equal(verdict(r.score),"Neutral");a.equal(r.active,2);
r=score([{dir:1,str:5},{dir:1,str:4},{dir:1,str:3}]);a.equal(verdict(r.score),"Strong Bullish");
r=score([{dir:1,str:3},{dir:-1,str:1}]);a.equal(r.score,0.5);a.equal(verdict(r.score),"Bullish");
r=score([{dir:-1,str:3},{dir:1,str:2}]);a.equal(verdict(r.score),"Lean Bearish");
r=score([]);a.equal(r.score,0);a.equal(r.active,0);
r=score([{dir:-1,str:4},{dir:-1,str:1},{dir:1,str:2}]);a.equal(verdict(r.score),"Bearish");a.equal(r.bear,2);
// Neutral: 0 in numerator, strength in denominator
r=score([{dir:1,str:5},{dir:"n",str:5}]);a.equal(r.score,0.5);a.equal(verdict(r.score),"Bullish");a.equal(r.neu,1);a.equal(r.bull,1);
r=score([{dir:1,str:4},{dir:"n",str:5},{dir:"n",str:5},{dir:0,str:5}]);a.ok(Math.abs(r.score-4/14)<1e-9);a.equal(verdict(r.score),"Lean Bullish");a.equal(r.active,3);
r=score([{dir:"n",str:3},{dir:"n",str:1}]);a.equal(r.score,0);a.equal(verdict(r.score),"Neutral");a.equal(r.active,2);
r=score([{dir:1,str:5},{dir:1,str:3},{dir:"n",str:2},{dir:-1,str:1}]);a.deepEqual([r.bull,r.neu,r.bear],[2,1,1]);a.ok(Math.abs(r.score-7/11)<1e-9);
// Old saved state (-1/0/1 only) still scores the same
r=score([{dir:1,str:3},{dir:0,str:3},{dir:-1,str:2}]);a.ok(Math.abs(r.score-0.2)<1e-9);a.equal(r.neu,0);
console.log("logic ok");
