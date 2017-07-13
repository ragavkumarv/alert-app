/**
 * Created by Ark on 7/13/2017.
 */
import {always, compose, cond, equals, head, map, match, reduceBy, tail, test, trim,T} from "ramda";
const eq = equals;
const al = always;
// const headMatch = compose(head,match)

const headMatch = x=>str=> compose(head, match(x))(str)?compose(head, match(x))(str):'Others';
const IncRgx = /INC.*JOBFAILURE[^:]*:[^:]*|INC.*MAXRUNALARM[^:]*:[^:]*|INC.+com\s/g;
const GrpRgx = /\w+~[a-zA-Z~]*\t|CRT~GLBL~\w+/g;
const regroup = cond([
    [test(/RNA~GLBL~CREDITANDSP~SUPPORT/g), al("IT_RnA_Credit_SP_L1_L2_Comms")],
    [
        test(/RNA~GLBL~RISKGENERATION.*|RNA~GLBL~COMMODITI.*/),
        al("IT_RnA_Commodities")
    ],
    [test(/TPE~GLBL~FX~CMD~SUPPORT.*/), al("IT_TPE_Macro_L1_L2_Comms")],
    [test(/TPE~RATES~.*/), al("IT_TPE_Rates_L1_L2_Comms")],
    [test(/SUMMIT~GLBL.*/), al("IT_TPE_Summit_L1_L2_Comms")],
    [test(/TPE~GLBL~CREDIT.*/), al("IT_TPE_Credit_L1_L2_Comms")],
    [T, x => x]
]);

const cidToGroup = cond([
    [test(/cen.*|cta.*|cte.*/ig), al("IT_AETT_Credit_L1_L2_Comms")],
    [test(/bfr.*|tig.*|fpg.*|fxq.*|lro.*|bbe.*|rff.+beowulf.*|rff.+congo.+ro.*/ig),al("IT_RnA_Commodities_and_FX_L1_Shared_Escalation")],
    [test(/exl.*|erc.*|fsp.*|rff.*|exn.*|emh.*|osr.*|eor.*|ext.*|exu.*|emx.*|ffe.*|esn.*|VRC.*|mex.*|PCG.*/ig),al("IT_RnA_FI_Rates_L1_Shared_Escalation")],
    [test(/spy.*|tso.*|tac.*|tra.*/ig), al("IT_TPE_Core_L1_L2_Comms")],
    [test(/sws_*/ig), al("IT_TPE_Credit_L1_L2_Comms")],
    [test(/dfx.*|bts.*|tcl.*|mfx.*/ig), al("IT_TPE_Macro_L1_L2_Comms")],
    [test(/min*/ig), al("IT_TPE_Rates_L1_L2_Comms")],
    [test(/sum.*|plt.*|ste.*/ig), al("IT_TPE_Summit_L1_L2_Comms")],
    [test(/flm*/ig), al("RnAPLMSSupport")],
    [test(/utr.*|ras.*|ice.*/ig), al("T_FI_AMSC_TCG_Events")],
    [test(/TSP.*|rrv.*/ig), al("RTB Research Analytics")],
    [T, x => false]
]);
// const strRp = compose(console.log,replace(/_/g,'.*'),replace(/_,\s/g,'.*|'));
// strRp('TSP_, rrv_')
const mgr = x => {console.log(x); return x;};
const exCid = headMatch(/\w+/g);
const exCidMapGroup = compose(mgr,cidToGroup,trim,exCid);
const exGrp = x =>exCidMapGroup(x)?exCidMapGroup(x):compose(mgr,regroup,trim,headMatch(GrpRgx))(x);

// const headMatch = x => compose(head, match(x));
const resObj = str => ({
    id: headMatch(IncRgx)(str),
    gp: exGrp(str),
    cId: exCid(str)
});

const testHeading = compose(test(/ComponentId/ig),head);
const ckHeading = x => testHeading(x)?tail(x):x;
const inClean = compose(
    map(resObj),
    ckHeading,
    map(mgr),
    map(trim),
    match(/\w.+\n/g)
);

/*inClean(`
 BBE__	INC0048386495	P00 - JOBFAILURE : bbeowulf_c_credit_ccar_bond_run_curvedelta_bat_ldn9 : Job has failed : Job status is now set to FAILURE.	7/12/17 10:33:17 PM	7/12/17 10:33:17 PM	1	A	PRODUCTION	BEOWULF	slgpsm020002309	AUTOSYS	Geetha Elumalai	Open	2	101233359
 CMS	 INC0048386450	nykpcr10473n03:JUSP-FICMS2 server store file /uscftp2/apps/jmsfarm/servers/JUSP-FICMS2/datastore/async-msgs.db size 3646944768 - high alert - Check EMSWebView http://my.barcapint.com/TIB/EMSWebView/server.xhtml?server=tcp://JUSP-FICMS2-A:42493,tcp://JUSP-FICMS2-B:42494 - FAQ http://sharepoint.barcapint.com/sites/middleware/support/ADQ/tibems/default.aspx .com	7/12/17 10:30:37 PM	7/13/17 6:34:51 AM	34	B	PRODUCTION	CMS - CREDIT MARKING SERVICE	nykpcr10473n03	APPLICATION_PROCESSES	Geetha Elumalai	Open	2	586491
 `)*/

const reduceToIdBy = reduceBy((acc, inc) => [...acc, inc.id], []);
const incsByGroup = reduceToIdBy(alertGp => regroup(alertGp.gp));
// const printKeyConcatValue = (value, key) => {console.log(key,'\n'); map(console.log)(value); console.log('\n')}
export  {inClean,incsByGroup};