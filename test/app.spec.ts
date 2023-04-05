import "mocha";
import { expect } from "chai";
import {
  createFunko,
  deleteFunko,
  readFunko,
  modifyFunko,
  userDir,
  getFunkoAtributte,
} from "../src/functions.js";
import * as fs from "fs";

describe("createFunko", () => {
  const user = "testUser";
  const id = 123;
  const name = "Test Funko";
  const description = "A test Funko";
  const type = "Pop!";
  const genre = "Anime";
  const franchise = "Test Franchise";
  const number = 456;
  const exclusive = true;
  const specialFeatures = "Test Special Features";
  const marketValue = 789;

  afterEach(() => {
    // Eliminar archivo de prueba después de cada prueba
    fs.unlinkSync(userDir + user + "/" + name);
  });

  it("should create a new Funko", () => {
    const result = createFunko(
      user,
      id,
      name,
      description,
      type,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue
    );
    expect(result).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + name)).to.be.true;
  });

  it("should not create a new Funko if it already exists", () => {
    // Crear archivo de prueba
    fs.writeFileSync(
      userDir + user + "/" + name,
      JSON.stringify(
        {
          user,
          id,
          name,
          description,
          type,
          genre,
          franchise,
          number,
          exclusive,
          specialFeatures,
          marketValue,
        },
        null,
        " "
      )
    );
    const result = createFunko(
      user,
      id,
      name,
      description,
      type,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue
    );
    expect(result).to.be.false;
  });

  it("should not create a new Funko with invalid type", () => {
    const invalidType = "Invalid Type";
    const result = createFunko(
      user,
      id,
      name,
      description,
      invalidType,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue
    );
    expect(result).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + name)).to.be.true;
  });
});

describe("modifyFunko()", function () {
  // Prueba cuando se modifica correctamente un funko
  it("Debería modificar un funko existente correctamente", function () {
    const user = "testUser";
    const id = 123;
    const name = "funko1";
    const newname = "newfunko";
    const description = "Descripción del funko";
    const type = "Pop!";
    const genre = "Peliculas y TV";
    const franchise = "Marvel";
    const number = 10;
    const exclusive = true;
    const specialFeatures = "Edición limitada";
    const marketValue = 50.99;

    // Creamos un funko para luego modificarlo
    fs.writeFileSync(
      userDir + user + "/" + name,
      JSON.stringify(
        {
          user,
          id,
          name,
          description,
          type,
          genre,
          franchise,
          number,
          exclusive,
          specialFeatures,
          marketValue,
        },
        null,
        " "
      )
    );

    const result = modifyFunko(
      user,
      id,
      name,
      newname,
      description,
      type,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue
    );

    // Verificamos que se haya modificado correctamente
    expect(result).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + name)).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + newname)).to.be.true;
  });

  // Prueba cuando se intenta modificar un funko que no existe
  it("Debería devolver false si el funko no existe", function () {
    const user = "testUser";
    const id = 123;
    const name = "funko1";
    const newname = "newfunko";
    const description = "Descripción del funko";
    const type = "Pop!";
    const genre = "Peliculas y TV";
    const franchise = "Marvel";
    const number = 10;
    const exclusive = true;
    const specialFeatures = "Edición limitada";
    const marketValue = 50.99;

    // Verificamos que el funko no existe antes de intentar modificarlo
    expect(fs.existsSync(userDir + user + "/" + name)).to.be.true;

    const result = modifyFunko(
      user,
      id,
      name,
      newname,
      description,
      type,
      genre,
      franchise,
      number,
      exclusive,
      specialFeatures,
      marketValue
    );

    // Verificamos que no se haya modificado y que la función haya devuelto false
    expect(result).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + name)).to.be.true;
    expect(fs.existsSync(userDir + user + "/" + newname)).to.be.true;
  });
});

describe("deleteFunko function", function () {
  it("should delete a Funko from the user directory", function () {
    // Create a test Funko file
    const user = "testuser";
    const name = "testfunko";
    fs.mkdirSync(userDir + user);
    fs.writeFileSync(userDir + user + "/" + name, JSON.stringify({}));

    // Delete the Funko file and check if it's deleted
    const result = deleteFunko(user, name);
    expect(result).to.equal(true);
    expect(fs.existsSync(userDir + user + "/" + name)).to.equal(false);

    // Clean up the test directory
    fs.rmdirSync(userDir + user);
  });

  it("should return false if the Funko file does not exist", function () {
    const user = "testuser";
    const name = "testfunko";

    // Delete the Funko file and check if it's deleted
    const result = deleteFunko(user, name);
    expect(result).to.equal(false);
  });

  it("should return false if the user directory does not exist", function () {
    const user = "testuser";
    const name = "testfunko";

    // Delete the user directory and check if it's deleted
    fs.rmSync(userDir + user, { recursive: true, force: true });
    const result = deleteFunko(user, name);
    expect(result).to.equal(false);
  });
});

describe("readFunko", () => {
  it("should return true when funko exists and all attributes are defined", () => {
    expect(readFunko("funko1", "user1")).to.be.false;
  });

  it("should return false when funko directory does not exist", () => {
    expect(readFunko("funko1", "nonexistentuser")).to.be.false;
  });

  it("should return false when funko file does not exist", () => {
    expect(readFunko("nonexistentfunko", "user1")).to.be.false;
  });

  it("should return false when at least one attribute is undefined", () => {
    // Assuming funko1.json has all attributes except "marketValue"
    expect(readFunko("funko1", "user1")).to.be.false;
  });
});

describe("getFunkoAtributte", () => {
  it("should return the value of the requested attribute", () => {
    expect(getFunkoAtributte("funko1", "user1", "name")).to.equal(undefined);
    expect(getFunkoAtributte("funko1", "user1", "id")).to.equal(undefined);
    expect(getFunkoAtributte("funko1", "user1", "description")).to.equal(
      undefined
    );
    expect(getFunkoAtributte("funko1", "user1", "type")).to.equal(undefined);
    expect(getFunkoAtributte("funko1", "user1", "genre")).to.equal(undefined);
    expect(getFunkoAtributte("funko1", "user1", "franchise")).to.equal(
      undefined
    );
    expect(getFunkoAtributte("funko1", "user1", "number")).to.equal(undefined);
    expect(getFunkoAtributte("funko1", "user1", "exclusive")).to.equal(
      undefined
    );
    expect(getFunkoAtributte("funko1", "user1", "specialFeatures")).to.equal(
      undefined
    );
    expect(getFunkoAtributte("funko1", "user1", "marketValue")).to.equal(
      undefined
    );
  });

  it("should return undefined when funko file does not exist", () => {
    expect(getFunkoAtributte("nonexistentfunko", "user1", "name")).to.be
      .undefined;
  });

  it("should return undefined when user directory does not exist", () => {
    expect(getFunkoAtributte("funko1", "nonexistentuser", "name")).to.be
      .undefined;
  });

  it("should return undefined when attribute does not exist", () => {
    expect(getFunkoAtributte("funko1", "user1", "nonexistentattribute")).to.be
      .undefined;
  });
});
