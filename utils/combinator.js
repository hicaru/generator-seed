let facts = [];

function fact(N){
    if(N==0 || N==1) return 1;
    if(facts[N]) return facts[N];
    facts[N] = N*fact(N-1);
    return facts[N];
}
function permutation(index, A){
    let n=A.length;
    let i=index+1;
    let res=[];

    for(let t=1;t<=n;t++){
        let f = fact(n-t);
        let k=Math.floor((i+f-1)/f);
        res.push(A.splice(k-1,1)[0]);
        i-=(k-1)*f;
    }

    if (A.length) res.push(A[0]);

    return res;
}

module.exports = {
  fact,
  permutation
};
