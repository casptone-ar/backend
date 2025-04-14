// 메모리 데이터 저장 (임시)
let pets = [];
let currentId = 1;

exports.getAllPets = (req, res) => {
  res.json({
    status: "success",
    data: pets,
  });
};

exports.createPet = (req, res) => {
  const newPet = {
    id: currentId++,
    ...req.body,
    createdAt: new Date(),
  };
  pets.push(newPet);

  res.status(201).json({
    status: "success",
    data: newPet,
  });
};

exports.getPetById = (req, res) => {
  const pet = pets.find((p) => p.id === parseInt(req.params.id));

  if (!pet) {
    return res.status(404).json({
      status: "fail",
      message: "Pet not found",
    });
  }

  res.json({
    status: "success",
    data: pet,
  });
};
