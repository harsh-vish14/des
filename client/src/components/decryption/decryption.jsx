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

const Decryption = () => {
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
    const res = await fetch("http://127.0.0.1:5000/decrypt", {
      method: "POST",
      body: JSON.stringify({
        crypertext: planeText,
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
      setEncryptedText(response.message.text);
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
                              ? "Copied Plain Text."
                              : "Copy Plain Text."
                          }
                        >
                          Plain Text: {encryptedText}
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
                  placeholder="Cipher Text"
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
                  Decrypt
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
              <div style={{ fontWeight: "bolder" }}>DES - Decryption</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Decryption;
