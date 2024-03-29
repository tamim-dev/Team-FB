import { useState, useEffect } from "react";
import {
    getDatabase,
    ref,
    set,
    remove,
    onValue,
    push,
    update,
} from "firebase/database";
import "./App.css";

function App() {
    const db = getDatabase();

    let [historyarr, setHistoryArr] = useState([]);
    let [add, setAdd] = useState("");
    let [division, setDivision] = useState("");
    let [multi, setMulti] = useState("");
    let [sub, setSub] = useState("");
    let [error, setError] = useState(false);
    let [errora, setErrorA] = useState(false);
    let [erroremt, setErrorEmt] = useState(false);
    let [hisinput, setHisInput] = useState(false);
    let [inone, setInOne] = useState("");
    let [intwo, setInTwo] = useState("");
    let [addedit, setAddEdit] = useState("");
    let [diviedit, setDiviEdit] = useState("");
    let [multiedit, setMultiEdit] = useState("");
    let [subedit, setSubEdit] = useState("");
    let [editId, setEditid] = useState();
    let [count, setCount] = useState(0);

    console.log(diviedit);

    useEffect(() => {
        const countRef = ref(db, "total/");
        onValue(countRef, (snapshot) => {
            snapshot.forEach((item) => {
                setCount(item.val());
            });
        });

        const teamRef = ref(db, "Team-fb/");

        onValue(teamRef, (snapshot) => {
            let arr = [];
            snapshot.forEach((item) => {
                arr.push({ ...item.val(), id: item.key });
                setDiviEdit(item.val(item.divitext));
                setAddEdit(item.val(item.addtext));
                setMultiEdit(item.val(item.addtext));
                setSubEdit(item.val(item.addtext));
            });
            setHistoryArr(arr);
        });
    }, []);

    // submit button  ====

    let handelClick = () => {
        setErrorEmt(false);
        if (add && division == "" && multi == "" && sub == "") {
            setAdd("");
            setError(false);
            setErrorA(false);
            setErrorEmt(false);
            if (add - 10 || add == 10) {
                setCount(add);
                setErrorA(false);

                let totalData = count + Number(add);
                setCount(totalData);
                set(ref(db, "total/"), {
                    totalValue: totalData,
                });

                set(push(ref(db, "Team-fb/")), {
                    addvalue: `${add}`,
                    addvaluec: count,
                    addvaluea: ` ${count + Number(add)} `,
                    addtext: " added by ",
                });
            } else {
                setErrorA(true);
                setError(false);
            }
        } else if (add == "" && division && multi == "" && sub == "") {
            setDivision("");
            setError(false);
            setErrorA(false);
            if (division - 10 || division == 10) {
                let totalData = count / division;
                setCount(totalData);
                set(ref(db, "total/"), {
                    totalValue: totalData,
                });
                set(push(ref(db, "Team-fb/")), {
                    addvalue: `${division}`,
                    addvaluec: count,
                    divivaluea: `${count / division}`,
                    divitext: " divided by ",
                });
                if (count == 0 && (division - 10 || division == 10)) {
                    setErrorEmt(true);
                }
                setError(false);
            } else {
                setErrorA(true);
            }
        } else if (add == "" && division == "" && multi && sub == "") {
            setMulti("");
            setError(false);
            setErrorA(false);
            if (multi - 10 || multi == 10) {
                let totalData = count * multi;
                setCount(totalData);
                set(ref(db, "total/"), {
                    totalValue: totalData,
                });
                set(push(ref(db, "Team-fb/")), {
                    addvalue: `${multi}`,
                    addvaluec: count,
                    multivaluea: `${count * multi}`,
                    multitext: " multiply by ",
                });
                if (count == 0 && (multi - 10 || multi == 10)) {
                    setErrorEmt(true);
                }
                setError(false);
            } else {
                setErrorA(true);
            }
        } else if (add == "" && division == "" && multi == "" && sub) {
            setSub("");
            setError(false);
            setErrorA(false);
            if (sub - 10 || sub == 10) {
                let totalData = count - sub;
                setCount(totalData);
                set(ref(db, "total/"), {
                    totalValue: totalData,
                });
                set(push(ref(db, "Team-fb/")), {
                    addvalue: `${sub}`,
                    addvaluec: count,
                    subvaluea: `${count - sub}`,
                    multitext: " subtraction by ",
                });
                if (count == 0 && (sub - 10 || sub == 10)) {
                    setErrorEmt(true);
                }
                setError(false);
            } else {
                setErrorA(true);
            }
        } else {
            setError(true);
            setErrorA(false);
            setAdd("");
            setDivision("");
            setMulti("");
            setSub("");
        }
    };
    // submit button  ====

    let hadelDelete = (item) => {
        remove(ref(db, "Team-fb/" + item.id))
    };

    let hadelEdit = (item) => {
        setHisInput(true);
        setInOne(item.addvaluec);
        setInTwo(item.addvalue);
        setEditid(item.id);
    };

    let handeleUpdate = () => {
        if( diviedit){
            update(ref(db, "Team-fb/" + editId), {
                addvaluec: inone,
                addvalue: intwo,
                divivaluea: Number(inone) + Number(intwo),
            });
        }else if(addedit){
            update(ref(db, "Team-fb/" + editId), {
                addvaluec: inone,
                addvalue: intwo,
                divivaluea: inone / intwo,
            });
        }
        
        setInOne("");
        setInTwo("");
        setHisInput(false);
    };

    let handeleCancel = () => {
        setHisInput(false);
    };

    let hadelReset =()=>{
        remove(ref(db, "total/" ))
        setCount(0)
    }
    return (
        <>
            <h1 className="container mx-auto text-center text-6xl font-bold mb-2 font-mono">
                Calculation
            </h1>
            <div className="container mx-auto mt-8 flex">
                <div className="w-[65%]  bg-green-400 p-10">
                    <div className="flex justify-between mt-10">
                        <div>
                            <h1 className="text-center text-3xl font-semibold mb-2">
                                Add
                            </h1>
                            <input
                                className=" border-[3px] rounded-lg p-1"
                                onChange={(e) => setAdd(e.target.value)}
                                value={add}
                            />
                        </div>
                        <button
                            className="border-[3px] px-5 rounded-lg bg-white text-3xl font-semibold"
                            onClick={handelClick}
                        >
                            Submit
                        </button>
                        <div>
                            <h1 className="text-center text-3xl font-semibold mb-2">
                                Division
                            </h1>
                            <input
                                className=" border-[3px] rounded-lg p-1"
                                onChange={(e) => setDivision(e.target.value)}
                                value={division}
                            />
                        </div>
                    </div>
                    <div className="text-center text-4xl relative top-28">
                        {count}
                    </div>
                    <div className="flex justify-between mt-[250px] mb-10 ">
                        <div>
                            <h1 className="text-center text-3xl font-semibold mb-2">
                                Multipication
                            </h1>
                            <input
                                className=" border-[3px] rounded-lg p-1"
                                onChange={(e) => setMulti(e.target.value)}
                                value={multi}
                            />
                        </div>
                        <div className="relative -top-[60px] text-3xl text-center">
                            {error && <h2>No input value !</h2>}
                            {errora && <h2>Enter a number !</h2>}
                            {erroremt && (
                                <h2>
                                    From zero you can't subtract or multiply or
                                    divide
                                </h2>
                            )}
                        </div>
                        <div>
                            <h1 className="text-center text-3xl font-semibold mb-2">
                                Substraction
                            </h1>
                            <input
                                className=" border-[3px] rounded-lg p-1"
                                onChange={(e) => setSub(e.target.value)}
                                value={sub}
                            />
                        </div>
                    </div>
                    <button className="border-[3px] rounded-lg bg-white px-6 py-2 flex text-lg font-semibold m-auto" onClick={hadelReset}>
                            Value reset
                        </button>
                </div>
                <div className="w-[35%] bg-red-400">
                    <h2 className="text-center mt-2 text-3xl font-semibold h-[8%]">
                        History
                    </h2>
                    <div className="h-[6%]">
                        {hisinput && (
                            <>
                                <input
                                    className="ml-2 mr-1"
                                    onChange={(e) => setInOne(e.target.value)}
                                    value={inone}
                                />
                                <input
                                    onChange={(e) => setInTwo(e.target.value)}
                                    value={intwo}
                                />
                                <button
                                    onClick={handeleUpdate}
                                    className="border-[3px] px-1 rounded-lg bg-white text-lg font-semibold ml-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handeleCancel}
                                    className="border-[3px] px-1 rounded-lg bg-white text-lg font-semibold ml-2"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    <ol className="list-decimal text-xl font-medium h-[60%]">
                        {historyarr.map((item, index) => (
                            <li className="ml-10 mt-2" key={index}>
                                {" "}
                                {item.addvaluec}
                                {item.divivaluec}
                                {item.multivaluec}
                                {item.subvaluec} {item.addtext}
                                {item.divitext}
                                {item.multitext}
                                {item.subtext} {item.addvalue}
                                {item.divivalue}
                                {item.multivalue}
                                {item.subvalue} total value {item.addvaluea}{item.divivaluea}
                                <button
                                    className="border-[3px] px-2 rounded-lg bg-white text-xl font-semibold"
                                    onClick={() => hadelDelete(item)}
                                >
                                    Delete
                                </button>{" "}
                                <button
                                    className="border-[3px] px-2 rounded-lg bg-white text-xl font-semibold"
                                    onClick={() => hadelEdit(item)}
                                >
                                    Edit
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
}

export default App;
