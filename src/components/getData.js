import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./dataSlice";
import { Box, CardContent, Slider, styled } from "@mui/material";
import { AiOutlineMenu, AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { SiInfracost } from "react-icons/si";
import { MdPriceChange } from "react-icons/md";
import "./cardContent.css";
export const GetData = () => {
  const { marketdata } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const fetchData = () => {
    return fetch("data.json")
      .then((response) => response.json())
      .then((result) => dispatch(getData(result)));
  };

  const PrettoSlider = styled(Slider)({
    color: "#52af77",
    height: 14,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      display: "none",
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#52af77",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  useEffect(() => {
    fetchData();
  }, []);
  console.log(marketdata);

  return (
    <>
      {marketdata.map((value, index) => {
        return (
          <div key={index + 1} className="main_Container">
            <Box className="Container">
              <CardContent className="CardContent">
                <Box className="iShares">
                  <AiOutlineMenu
                    style={{ marginTop: "10px", fontSize: "20px" }}
                  />
                  <Box className="Box">
                    <span>{value.scrip}</span>
                    <br />
                    <p>{value.avg_cost}</p>
                  </Box>
                  <Box className="shares">
                    <p style={{ display: "unset", marginLeft: "-22px" }}>
                      iShares
                    </p>
                    <br />
                    <span>
                      By Black Rock
                      <br />
                    </span>
                    <br />
                  </Box>
                </Box>
                <Box className="Index">
                  <p>S&P 500 Index</p>
                  <Box className="Equality">
                    <p>US Equality</p>
                  </Box>
                </Box>
              </CardContent>
            </Box>
            <Box className="Scroll" style={{ display: "flex" }}>
              <Box>
                <CardContent className="CardContent">
                  <Box className="market_Values">
                    <MdPriceChange className="Quantity" />{" "}
                    <p style={{ marginLeft: "-107px" }}>Quantity</p>
                    <Box>
                      <p style={{ marginLeft: "-57px" }}>{value.quantity}</p>
                    </Box>
                  </Box>
                  <Box className="market_Values">
                    <SiInfracost className="Cost" />{" "}
                    <p style={{ marginLeft: "-92px" }} a>
                      Avg.Cost
                    </p>
                    <p style={{ marginLeft: "-27px" }}>{value.avg_cost}</p>
                  </Box>
                  <Box className="market_Values">
                    <CiMoneyBill className="Money" />
                    <p style={{ marginLeft: "-44px" }}> Invested Amt</p>
                    <p>{value.invested_amount}</p>
                  </Box>
                </CardContent>
              </Box>

              <Box>
                <CardContent className="CardContent">
                  <Box className="market_Value">
                    <p>Market Value </p>
                    <p>{value.invested_amount}</p>
                  </Box>
                  <Box className="market_Value">
                    <p style={{ marginLeft: "-6px" }}>% of portfolio</p>
                    <p>{value.portfolio_percentage}%</p>
                  </Box>
                  {/* <Slider size="small" id="Slider" value={value.portfolio_percentage} /> */}
                  <PrettoSlider
                    value={value.portfolio_percentage}
                    id="Slider"
                  />
                </CardContent>
              </Box>

              <Box>
                <CardContent className="CardContent">
                  <Box className="market_Value">
                    <p>Unrealixed P/L </p>
                    <p>{value.unrealized_PL}</p>
                  </Box>
                  <Box className="market_Value">
                    <p style={{ marginLeft: "-6px" }}>% of portfolio</p>
                    <p>
                      {value.return_percentage > 0 ? (
                        <AiFillCaretUp
                          className="up_Arow"
                          style={{ color: "green" }}
                        />
                      ) : (
                        <AiFillCaretDown
                          className="down_Arow"
                          style={{ color: "red" }}
                        />
                      )}
                      {value.return_percentage}%
                    </p>
                  </Box>
                  <div className="parentDiv">
                    <div
                      className="negativeValue"
                      style={{
                        width: `${Math.abs(value.return_percentage)}%`,
                        backgroundColor: `${
                          value.return_percentage > 0 ? "" : "red"
                        }`,
                      }}
                    ></div>
                    <div
                      className="positiveValue"
                      style={{
                        width: `${Math.abs(value.return_percentage)}%`,
                        backgroundColor: `${
                          value.return_percentage > 0 ? "green" : ""
                        }`,
                      }}
                    ></div>
                  </div>
                </CardContent>
              </Box>
            </Box>
            <Box>
              <CardContent className="CardContents">
                <button style={{ marginTop: "13px" }}>BUY</button>
                <button>SELL</button>
              </CardContent>
            </Box>
          </div>
        );
      })}
    </>
  );
};
