import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
import { Tooltip } from "antd";
import { CopyToClipboard } from "react-copy-to-clipboard";
import LottieAnimation from "../lottie/lottieAnimation";
import encryptLoading from "../../../animation/encryptLoading.json";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import createNotification from "../notification/notification";

const dummyRound = [
  {
    results: "18CA18AD 5A78E394 194CD072DE8C",
    round: 1,
  },
  {
    results: "5A78E394 4A1210F6 4568581ABCCE",
    round: 2,
  },
  {
    results: "4A1210F6 B8089591 06EDA4ACF5B5",
    round: 3,
  },
  {
    results: "B8089591 236779C2 DA2D032B6EE3",
    round: 4,
  },
  {
    results: "236779C2 A15A4B87 69A629FEC913",
    round: 5,
  },
  {
    results: "A15A4B87 2E8F9C65 C1948E87475E",
    round: 6,
  },
  {
    results: "2E8F9C65 A9FC20A3 708AD2DDB3C0",
    round: 7,
  },
  {
    results: "A9FC20A3 308BEE97 34F822F0C66D",
    round: 8,
  },
  {
    results: "308BEE97 10AF9D37 84BB4473DCCC",
    round: 9,
  },
  {
    results: "10AF9D37 6CA6CB20 02765708B5BF",
    round: 10,
  },
  {
    results: "6CA6CB20 FF3C485F 6D5560AF7CA5",
    round: 11,
  },
  {
    results: "FF3C485F 22A5963B C2C1E96A4BF3",
    round: 12,
  },
  {
    results: "22A5963B 387CCDAA 99C31397C91F",
    round: 13,
  },
  {
    results: "387CCDAA BD2DD2AB 251B8BC717D0",
    round: 14,
  },
  {
    results: "BD2DD2AB CF26B472 3330C5D9A36D",
    round: 15,
  },
  {
    results: "19BA9212 CF26B472 181C5D75C66D",
    round: 16,
  },
];

const Encryption = () => {
  const [generate, setGenerate] = useState(false);
  const [rounds, setRounds] = useState([]);
  const [generatedRounds, setGeneratedRounds] = useState([]);
  const [encryptedText, setEncryptedText] = useState("");
  const [isPlaneTextCopy, setIsPlaneTextCopy] = useState(false);
  const [isKeyCopy, setIsKeyCopy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [planeText, setPlaneText] = useState("");
  const [key, setKey] = useState("");
  const [showResult, setShowResult] = useState(false);

  const encryption = async () => {
    setLoading(true);

    // fetching start
    const res = await fetch("http://127.0.0.1:5000/encrypt", {
      method: "POST",
      body: JSON.stringify({
        plaintext: planeText,
        key: key,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (response.status !== 200) {
      createNotification("error", "Error Occurred", response.message);
      setLoading(false);
    } else {
      setEncryptedText(response.message.cipher_text);
      setGeneratedRounds(response.message.rounds);
      setLoading(false);
      setGenerate(true);
    }
    // fetching end
  };

  useEffect(() => {
    let ending = 0;
    console.log(generate);
    const interval = setInterval(() => {
      if (ending === generatedRounds.length + 1) {
        setShowResult(true);
        return;
      }
      if (generate) {
        setRounds(
          generatedRounds.slice(0, ending).map((round, index) => {
            return (
              <div className="flasher" key={index}>
                <div className="round">{round.round}:</div>
                <div>{` ${round.results}`}</div>
              </div>
            );
          })
        );
      } else {
        clearInterval(interval);
        setRounds([]);
      }
      ending++;
    }, 500);
    return () => clearInterval(interval);
  }, [generate]);

  const reset = () => {
    setEncryptedText("");
    setGeneratedRounds([]);
    setLoading(false);
    setGenerate(false);
    setKey("");
    setPlaneText("");
  };

  return (
    <div>
      {loading ? (
        <AiOutlineLoading3Quarters size={30} className="loading" />
      ) : (
        <>
          <div className="inputs">
            {generate ? (
              <>
                <div className="reset" onClick={reset}>
                  Reset
                </div>
                {showResult && (
                  <>
                    <div className="des-result">
                      <CopyToClipboard
                        text={encryptedText}
                        onCopy={() => {
                          setIsPlaneTextCopy(true);
                          setTimeout(() => {
                            setIsPlaneTextCopy(false);
                          }, 2000);
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title={
                            isPlaneTextCopy
                              ? "Copied Cipher Text."
                              : "Copy Cipher Text."
                          }
                        >
                          Cipher Text: {encryptedText}
                        </Tooltip>
                      </CopyToClipboard>
                    </div>
                    <div className="des-key">
                      <CopyToClipboard
                        text={key}
                        onCopy={() => {
                          setIsKeyCopy(true);
                          setTimeout(() => {
                            setIsKeyCopy(false);
                          }, 2000);
                        }}
                      >
                        <Tooltip
                          placement="top"
                          title={isKeyCopy ? "Copied Key." : "Copy Key."}
                        >
                          Key: {key}
                        </Tooltip>
                      </CopyToClipboard>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 20,
                  width: "100%",
                }}
              >
                <Input
                  size="large"
                  placeholder="Plane Text"
                  value={planeText}
                  onChange={(e) => {
                    setPlaneText(e.target.value);
                  }}
                />
                <Input
                  placeholder="Key"
                  size="large"
                  value={key}
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                />
                <Button type="primary" danger size="large" onClick={encryption}>
                  Encrypt
                </Button>
              </div>
            )}
          </div>
          {generate ? (
            <div className="rounds">{rounds}</div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <LottieAnimation
                lottieJson={encryptLoading}
                height={300}
                width={300}
              />
              <div style={{ fontWeight: "bolder" }}>DES - Encryption</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Encryption;
