//https://docs.google.com/document/d/1dQMcFDz6JL7f24KohakaqCa7Suse68oMIxaUL6W-GJs/edit
/**
 * NOTES:
 * For LIVE use make sure to use the correct Post Back URL - The URL that does NOT include the word sandbox
 * This is very basic code provided as an example - You may want to modify it- add to it or delete parts
 * All lines that start with ll(' are a function call to a function that logs information to a spreadsheet
*/

function doPost(e) {
  var aWells_POST_parameters,aWells_PostBackURL,aWells_Data_Received_Object,
      aWells_wasThisATest;
  try{
  //Logger.log('Pay Pal Instant Notification ran')
  //ll('Pay Pal Instant Notification ran',e)
  //USER INPUT
    //aWells_PostBackURL = "https://ipnpb.paypal.com/cgi-bin/webscr";//For LIVE notifications
    aWells_PostBackURL = "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr";//For testing with sandbox-Comment this out for LIVE use
  
  //END OF USER INPUT
  
  aWells_Data_Received_Object = e.parameter;//parameter is an Apps Script property name- gets an object of all the data
  //ll('aWells_Data_Received_Object',aWells_Data_Received_Object)
  //ll('typeof aWells_Data_Received_Object',typeof aWells_Data_Received_Object)
  //ll('JSON.stringify(aWells_Data_Received_Object)',JSON.stringify(aWells_Data_Received_Object))
  
  aWells_wasThisATest = aWells_Data_Received_Object.test_ipn;//This is only for POST requests from the IPN simulator
  //ll('aWells_wasThisATest',aWells_wasThisATest)
  //ll('typeof aWells_wasThisATest',typeof aWells_wasThisATest)
  
  /*
  if (aWells_wasThisATest==="1") {//Remove these blocks of code if you do not use them
    ll('This is a test of the IPN System')
  } else {
    ll('This is NOT a test.  We repeat . . This is NOT a test of the IPN System.')
  }
  */
    
  aWells_Data_Received_Object.cmd = '_notify-validate';//Add an element to the object with the property name cmd
  
  //header for User-Agent - See link: https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNImplementation/
  aWells_POST_parameters = {
    'method': 'post',
    'headers': {'User-Agent':'AppsScript-IPN-VerificationScript'},
    'payload':aWells_Data_Received_Object
  }
  
  var resp = UrlFetchApp.fetch(aWells_PostBackURL, aWells_POST_parameters);//Submit a POST request back to PayPal
    //to complete the handshake
  //ll('resp',resp)
  
  //Possible Pay Pal property names

  /*
  payment_date
  item_number
  option_selection1
  payment_status
  payment_gross
  mc_currency
  payment_fee
  first_name
  last_name
  payer_email
  residence_country
  txn_id
  */

  //return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT);
  }catch(e){
    //ll('Caught Error:',e.message)
    
  }
}
