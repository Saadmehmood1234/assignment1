import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { Checkbox } from "primereact/checkbox";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useCheckContext } from "./context/CheckContext";
interface ResponseData {
  id: string;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: string;
  date_end: string;
  isChecked: boolean;
}
const App = () => {
  const [data, setData] = useState<ResponseData[]>([]);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  // const [checkData, setCheckData] = useState<CheckBox[]>([]);
  const [query, setQuery] = useState("");
  const overlayRef = useRef<OverlayPanel>(null);
  const { checkData, setCheckData } = useCheckContext();

  const [isSearch, setIsSearch] = useState(false);
  const [searchLimit, setSearchLimit] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.artic.edu/api/v1/artworks?page=${first}`
        );

        if (!res) {
          console.log("Error in Fetching the data");
        }

        setData(res.data.data);
        setLoading(false);

        if (checked && !isSearch) {
          setCheckData((prev) => {
            const updated = res.data.data.map((newItem: ResponseData) => {
              const prevItem = prev.find(
                (item) => item.id.toString() === newItem.id.toString()
              );
              if (prevItem && prevItem.isChecked === false) {
                return { ...newItem, isChecked: false };
              }
              return { ...newItem, isChecked: true };
            });
            const others = prev.filter(
              (item) =>
                !updated.find(
                  (update: ResponseData) =>
                    update.id.toString() === item.id.toString()
                )
            );
            return [...others, ...updated];
          });
        } else {
          setCheckData((prev) => {
            const updated = res.data.data.map((newItem: ResponseData) => {
              const prevItem = prev.find(
                (item) => item.id.toString() === newItem.id.toString()
              );
              return (
                prevItem ?? {
                  ...newItem,
                  isChecked: false,
                }
              );
            });
            const others = prev.filter(
              (item) =>
                !updated.find(
                  (u: ResponseData) => u.id.toString() === item.id.toString()
                )
            );
            return [...others, ...updated];
          });
        }
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, [first]);

  const onPageChange = (event: any) => {
    if (loading) {
      return;
    }
    setFirst(event.first);
    setRows(event.rows);
    console.log(rows, first);
  };
  const handleIndividualCheck = (id: string) => {
    setCheckData((prev) =>
      prev.map((data) =>
        data.id === id ? { ...data, isChecked: !data.isChecked } : data
      )
    );
  };
  const updatedData = useMemo(() => {
    return data.map((d) => {
      const match = checkData.find((data) => data.id === d.id);
      return {
        ...d,
        isChecked: match?.isChecked || false,
      };
    });
  }, [data, checkData]);
  const checkedBodyTemplate = (rowData: ResponseData) => {
    // const check = checkData.find((check) => check.id === rowData.id);
    // console.log("Test", check?.isChecked);

    return (
      <Checkbox
        onChange={() => handleIndividualCheck(rowData.id)}
        checked={rowData?.isChecked || false}
      />
    );
  };
  const handleAllCheck = () => {
    setIsSearch(false);
    checked
      ? setCheckData((prev) =>
          prev.map((prevData) => ({ ...prevData, isChecked: false }))
        )
      : setCheckData((prev) =>
          prev.map((prevData) => ({ ...prevData, isChecked: true }))
        );
    setChecked((prev) => !prev);
  };
  const handleSearchRows = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === "") return;

    const limit = Number(query);
    if (isNaN(limit) || limit <= 0) return;

    setChecked(false);
    setIsSearch(true);
    setSearchLimit(limit);
    setFirst(0);
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.artic.edu/api/v1/artworks?page=1`
      );

      if (!res) {
        console.log("Error in Fetching the data");
        setLoading(false);
        return;
      }

      const newData = res.data.data;
      setData(newData);
      setCheckData((prev) => {
        const updated = newData.map((item: ResponseData, index: number) => ({
          ...item,
          isChecked: index < searchLimit,
        }));

        const others = prev.filter(
          (item) => !updated.find((update: any) => update.id === item.id)
        );

        return [...others, ...updated];
      });

      setLoading(false);
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  };

  console.log(checkData.map((data) => data.isChecked));
  return (
    <div className=" flex w-full p-4 gap-4 flex-col justify-center items-center">
      <div className="w-full overflow-x-auto flex justify-center items-center">
        <div className="max-w-7xl">
          <OverlayPanel ref={overlayRef}>
            <form action="" onSubmit={handleSearchRows}>
              <div className="flex flex-col gap-2">
                <InputText
                  value={query}
                  type="number"
                  placeholder="Select rows"
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button label="Submit" />
              </div>
            </form>
          </OverlayPanel>
          <DataTable
            value={updatedData}
            header="GrowMeOrganic Assignment By Saad Mehmood"
            tableStyle={{ width: "100%" }}
          >
            <Column
              header={
                <Checkbox
                  onChange={handleAllCheck}
                  checked={checked}
                ></Checkbox>
              }
              body={checkedBodyTemplate}
            />
            <Column
              header={
                <i
                  onClick={(e) => overlayRef.current?.toggle(e)}
                  className="pi pi-angle-down cursor-pointer"
                  style={{ fontSize: "1rem" }}
                ></i>
              }
            />
            <Column field="title" header="Title" />
            <Column field="place_of_origin" header="Place Of Origin" />
            <Column field="artist_display" header="Artist Display" />
            {/* <Column field="inscriptions" header="Inscriptions" /> */}
            <Column field="date_start" header="Start Date" />
            <Column field="date_end" header="End Date" />
          </DataTable>
        </div>
      </div>
      {loading && (
        <div className=" absolute   z-10">
          <ProgressSpinner style={{ width: "50px", height: "50px" }} />
        </div>
      )}
      {/* <Checkbox
        onChange={(e) => setChecked(e.checked)}
        checked={checked}
      ></Checkbox> */}
      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={10776}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default App;
