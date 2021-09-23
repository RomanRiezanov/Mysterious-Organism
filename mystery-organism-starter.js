// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      let i = 0;
      var mutateDna = [];
      console.log(this.dna)

      for (let i = 0; i < this.dna.length; i++) {
        var randomDna = returnRandBase();
        while (randomDna === this.dna[i]) {
          randomDna = returnRandBase();
        }
        this.dna[i] = randomDna;
      }
      return this.dna;
    },
    compareDNA(pAequor) {
      var compare = 0
      this.dna.forEach((num1, index) =>{ 
        var num2 = pAequor[index];
        if (num2 === num1) {
          compare += 1;
        }
      })
      var result = compare * 100 / this.dna.length;
      return `Specimen #1 and Specimen #2 have ${result}% DNA in common`
    },
    willLikelySurvive () {
      var compare = 0;
      for (dnk of this.dna) {
        if (dnk === 'C' || dnk === 'G') {
          compare++
        }
      }
      var result = compare * 100 / 15
      if (result >= 60) {
        return true;
      } 
      return false;
    },
    complementStrand() {
      var secondDna = [];
      console.log(this.dna);
      for(dnk of this.dna) {
        if(dnk === 'A') {
          secondDna.push('T');
        } else if(dnk === 'T') {
          secondDna.push('A');
        } else if(dnk === 'G'){
          secondDna.push('C');
        } else {
          secondDna.push('G');
        }
      }
      return secondDna;
    }
  }
}

const survivingSpecimen = [];
let idCounter = 1;

while (survivingSpecimen.length < 30) {
  let newOrg = pAequorFactory(idCounter, mockUpStrand());
  if (newOrg.willLikelySurvive()) {
    survivingSpecimen.push(newOrg);
  }
  idCounter++;
}

console.log(survivingSpecimen);