class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    const numberOfOffspring = this.offspring.length;
    return numberOfOffspring;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfGenerations = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      numberOfGenerations ++;
    }
    
    return numberOfGenerations;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    const seniority = this.numberOfVampiresFromOriginal;
    const secondVampSeniority = vampire.numberOfVampiresFromOriginal;

    if (seniority > secondVampSeniority) {
      return false;
    }
    return true;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  closestCommonAncestor(vampire) {
    //Set thisVamp to vampire object that method is called on
    let thisVamp = this;
    
    //Intro two separate arrays to store lineage of each vampire
    const lineage1 = [];
    const lineage2 = [];

    //Push original vampire into their own lineage
    lineage1.push(this);
    lineage2.push(vampire);

    //Push all ancestor vampires into respected lineages
    while (vampire.creator) {
      lineage2.push(vampire.creator);
      vampire = vampire.creator;
    }

    while (thisVamp.creator) {
      if (thisVamp.creator !== null) {
        lineage1.push(thisVamp.creator);
      }
      thisVamp = thisVamp.creator;
    }

    //Nested loops to loop through each lineage array and find a matching vampire name
    for (const vamp of lineage1) {
      for (const vamp2 of lineage2) {
        if (vamp.name === vamp2.name) {
          return vamp;
        }
      }
    }
  }
}


module.exports = Vampire;

