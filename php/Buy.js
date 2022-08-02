const processTransaction = async () => {
  setLoading(true);
  
  /*const txResponse = await fetch(".pages\api\createTransaction.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  
  const txResponse = await createTransaction(msg,res);
  //const txData = await txResponse.json();

  console.log("txResponse",txResponse)
  const txData = txResponse;
   
  // We create a transaction object
  const tx = Transaction.from(Buffer.from(txData.transaction, "base64"));
  console.log("Tx data is", tx);
  */
  // Attempt to send the transaction to the network
  try {
    // Send the transaction to the network
    //const txHash = await sendTransaction(tx, connection);
    //console.log(`Transaction sent: https://solscan.io/tx/${txHash}?cluster=devnet`);
    // Even though this could fail, we're just going to set it to true for now
    //setPaid(true);
    var formulario = new FormData();
    
    formulario.append("wallet",`'${publicKey.toString()}'`);
    /*
    const txDb= await fetch("localhost:80/modificar.php",{
      method: "POST",
      body: formulario,
    }).then(response => console.log(response))*/
    console.log(`'${publicKey.toString()}'`);
    const txDb = await fetch(`http://127.0.0.1/modificar.php`,{
        method: "POST",
        body: formulario,
      })
    const a = await txDb.json();
    console.log("a",a)

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

