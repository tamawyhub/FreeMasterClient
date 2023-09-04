var rpcs_addr = "localhost:41000";
var pcm;  // the main FreeMASTER communication object

function on_connected() 
{
    /* Typically, you want to enable events to make use of the full API 
     * provided by desktop application. */
    //pcm.EnableEvents(true);
    console.log("PCM object connected!");
}

function on_error(err) 
{
    /* Erors are reported in the status field. */
    console.log("PCM object failed!");
}

function init()
{
    if(typeof(FreeMASTER) != "undefined")
    {
        rpcs_addr = FreeMASTER.rpcs_addr;

        // also provide some information about this session
        fmstr_info.innerHTML = "FreeMASTER version: " + FreeMASTER.version + "<br>" +
            "JSON-RPC server address: " + FreeMASTER.rpcs_addr + "<br>";
    }

    pcm = new PCM(rpcs_addr, on_connected, on_error, on_error);
    pcm.OnServerError = on_error;
    pcm.OnSocketError = on_error;

    var pcmDiv = document.getElementById('pcm');
    pcmDiv.data=pcm;
}

init();
