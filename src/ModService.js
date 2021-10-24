class ModService {
  static isMod = false;

  static toggleModStatus() {
    this.isMod  = !this.isMod;
  }
}

export default ModService;