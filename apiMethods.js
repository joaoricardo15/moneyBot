let api = require('./apiRequests')
  , server = require('./server')

module.exports.GetBalance = async function (token)
{
  try
  {
    let result = await api.Get(token, "/v1/wallets/balance");
    if (result["message"] !== null)
      throw result["message"];

    return result["data"];
  }
  catch (error) {
    throw "getBalance -> "+error;
  }
}

module.exports.GetOrders = async function (token, currency_code)
{
  try
  {
    let result = await api.Get(token, "/v1/market?currency="+currency_code);
    if (result["message"] !== null)
      throw result["message"];

    return result["data"];
  }
  catch (error) {
    throw "GetOrders -> "+error;
  }
}

module.exports.GetTrades = async function (token, currency_code, page_size)
{
  try
  {
    let result = await api.Get(token, "/v1/public/"+currency_code+"/trades?page_size="+page_size+"&current_page=1");
    if (result["message"] !== null)
      throw result["message"];

    return result["data"];
  }
  catch (error) {
    throw "GetTrades -> "+error;
  }
}

module.exports.GetTiker = async function (token, currency_code)
{
  try
  {
    let result = await api.Get(token, "/v1/public/"+currency_code+"/ticker");
    if (result["message"] !== null)
      throw result["message"];
    
    return result["data"];
  }
  catch (error) {
    throw "GetTiker -> "+error;
  }
}

module.exports.GetSummary = async function (token, currency_code)
{
  try
  {
    let result = await api.Get(token, "/v1/market/summary?currency="+currency_code);
    if (result["message"] !== null)
      throw result["message"];

    return result["data"];
  }
  catch (error) {
    throw "GetSummary -> "+error;
  }
}

module.exports.GetUserOrders = async function (token, currency_code, status)
{
  try
  {
    let result = await api.Get(token, "/v1/market/user_orders/list?currency="+currency_code+"&status="+status); 
    if (result["message"] !== null)
      throw result["message"];

    return result["data"];
  }
  catch (error) {
    throw "GetUserOrders -> "+error;
  }
}

module.exports.CreateOrder = async function (token, currency_code, amount, type, unit_price)
{
  try
  {
    let payload = JSON.stringify({
      currency: currency_code,
      amount: amount,
      type: type,
      subtype: "limited",
      unit_price: unit_price 
    });
    let result = await api.Request(token, "/v1/market/create_order", "POST", payload);
    if (result["message"] !== null)
      throw result["message"];

    if (server.Globals.envMode === server.Globals.env.Local)
      console.log("ordem "+result["data"]["id"]+" criada com sucesso!!!");

    return result["data"]["id"];
  }
  catch (error) {
    throw "CreateOrder -> "+error;
  } 
}

module.exports.CancelOrder = async function (token, orderId)
{
  try
  {
    let result = await api.Request(token, "/v1/market/user_orders", "DELETE", {"id": orderId});
    if (result["message"] !== null)
      throw result["message"];

    if (server.Globals.envMode === server.Globals.env.Local)
      console.log("ordem "+orderId+" cancelada com sucesso!!!");
        
    return orderId;
  }
  catch (error) {
    throw "CancelOrder -> "+error;
  } 
}