# Apps-Script-PayPal-Instant-Payment-Notification-IPN-Listener
Get confirmation of Pay Pal transactions sent to an Apps Script Web App

Receive payment information from PayPal to an Apps Script Web App
 
IPN or Instant Payment Notification, informs you of Payments received from Pay Pal.
 
# General Pay Pal information about the IPN listener.

- PayPal can send probably 2 or 300 different types of data, all with their own property name.
- The first property name that you may want to know about is: ***txn_type***
txn_type tells you what category of data that it is sending, for example: ***express_checkout*** which means that a single payment was received from the express checkout.  Or new_case meaning that a dispute was filed.  Transaction Types
- The next property names you’ll probably want to know about are the “Payment Information Variables”  [Payment Information Variables](https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNandPDTVariables/#id091EB04C0HS)
- The payment information property that you’ll probably want to use is ***payment_status***  which has many sub-properties indicating the payment status.  Of the 12 or so sub-properties of ***payment_status***, you’ll probably be the most interested in:  ***Completed*** and ***Processed*** ; and also ***Denied*** and ***Failed***.  There is also:  ***Pending Refunded Reversed*** and ***Voided***.  But, if you didn’t get the payment, then you probably won’t want to give the user access to whatever you’re selling.

# Confirm to PayPal that a message was received.

- There are two things that must happen from the Apps Script end to respond back to Pay Pay:
Quote:After receiving the IPN message from PayPal, your listener returns an empty HTTP 200 response to PayPal. Otherwise, PayPal resends the IPN message.  This happens automatically and internally with the Apps Script Web App.  You do not need to program anything for the 200 OK response to happen.  All that needs to happen, is for no errors to occur in your Apps Script code.
- Quote: 
> Your listener sends the complete message back to PayPal using HTTPS POST.  Prefix the returned message with the cmd=_notify-validate variable, but do not change the message fields, the order of the fields, or the character encoding from the original message.
- There is another quote that states to add the "cmd=_notify-validate" to the end, and not the beginning:  Quote:  
>After receiving an IPN message from PayPal, you must respond to PayPal with a POST message that is an exact copy of the received message but with "cmd=_notify-validate" added to the end of the message.  

- One part of the documentation states to add the "cmd=_notify-validate" to the beginning, and another part of the documentation states to add it to the end.  I just added a cmd property to the object with the value _notify-validate" and the Simulator stated that the handshake was verified.

# Create and Publish an Apps Script Web App as the IPN listener page
- The Web App needs a doPost() function to receive the request sent from PayPal
- Add code to the Apps Script code editor - for code see:
 
# Create an IPN listener page

- IPN Set up Guide
- In your PayPal account profile- Add the Apps Script Web App Url as the IPN listener page.
- Go into your Profile Settings
- Choose “My Selling Tools”
- Click “update” in “Instant payment notifications” row
- Click the “Choose IPN Settings” button

## Note:  You do not need to set your profile settings to test the Apps Script Web App, but for it to be working live, you must add the Web App url to the profile settings.

# Test your IPN Listener - Which is an Apps Script Web App

- You can use the IPN simulator: Docs IPN Simulator
- There is a test property from the IPN simulator named: test_ipn  PayPal doesn’t call it a property, they call it a variable.  That variable is not included in the live IPN message.
- There are 2 basic things that you must do to use the IPN Simulator.  You need to add the word “sandbox” to the postback URL: https://ipnpb.sandbox.paypal.com/cgi-bin/webscr
- Secondly, the Apps Script Web App must be published and functioning.  That was covered above.
- Next Log into the Developer part of Pay Pal:  https://developer.paypal.com/docs/classic/ipn/integration-guide/IPNSimulator/  I can not find a way to get to the IPN simulator documentation by navigating the menus.  Unless you are logged in, the Dashboard is not displayed, and you can not get to the IPN Simulator
- Paste your Apps Script URL into the IPN handler URL field.
- Choose the Transaction type - Probably “Express Checkout”
- Make sure that the latest version of your Apps Script Web App is published, or it won’t run the newest version.
If you don’t use the special test URL with “sandbox” you may get a message in the simulator that the handshake was verified, but get an INVALID response back from the POST request.
- You should receive a VERIFIED response back from the handshake.
 
 
 
 
 
 
