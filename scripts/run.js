const main = async () => {
  const [owner, randomPerson, randomPerson2] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();

  console.log("Contract deployed to: ", waveContract.address);
  console.log("Contract deployed by: ", owner.address);

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  waveCount = await waveContract.getTotalWaves();
  console.log(waveCount.toNumber());

  await executeMyWave(waveContract, owner, "I'm the owner, Hello!");
  await executeMyWave(waveContract, randomPerson, "I'm a random");
  await executeMyWave(waveContract, randomPerson2, "I'm a 2nd random");
  await executeMyWave(waveContract, randomPerson, "We are random friends!");

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log("Contract balance: ", hre.ethers.utils.formatEther(contractBalance));

  let allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
};

const executeMyWave = async (waveContract, person, message) => {
  let waveTxn = await waveContract.connect(person).wave(message);
  await waveTxn.wait();
}

const runMain = async () => {
  try {
    await main();
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();