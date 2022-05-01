import React, { useEffect, useState } from "react";
import Dialog from "rc-dialog";
import useStore, { AuthType } from "./useStore";

import Button from "components/button";
import Input from "components/input";
import { ReactComponent as IconCheck } from "assets/check.svg";

import styles from "./index.module.less";

const AuthPass = () => {
  const { activeAuth, setActiveAuth, getAuth, setAuth } = useStore();
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [valid, setValid] = useState(false);
  const [validConfirm, setValidConfirm] = useState(false);

  const handleConfirm = () => {
    const auth = getAuth(AuthType.PASS);
    setAuth({ ...auth, success: true, pass: pass, shard: "pass test shard" });
    setActiveAuth(null);
  };

  useEffect(() => {
    setValid(pass.length > 0 && regexp.test(pass));
    setValidConfirm(
      passConfirm.length > 0 && regexp.test(pass) && pass === passConfirm
    );
  }, [pass, passConfirm]);

  return (
    <Dialog
      visible={activeAuth === AuthType.PASS}
      onClose={() => setActiveAuth(null)}
      rootClassName={styles.dialogRoot}
      title="AUTH #2"
      footer={
        <footer className="  text-center">
          {validConfirm && (
            <Button type="primary" className="mr-2" onClick={handleConfirm}>
              CONFIRM
            </Button>
          )}
          <Button onClick={() => setActiveAuth(null)}>CANCEL</Button>
        </footer>
      }
    >
      <main>
        <h5 className="mb-6">Auth Type: Passphrase</h5>
        <section>
          <p className="text-orange-300">
            Input your passphrase. Letters, numbers and ‘_’ are allowed.
          </p>
          <div className="flex items-center">
            <Input
              className="flex-1"
              onChange={(e) => setPass(e.target.value)}
            />
            <span className="ml-4 w-4">
              {valid && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
        </section>
        <section className="mt-4">
          <p className="text-orange-300">Input your passphrase again.</p>
          <div className="flex items-center">
            <Input
              className="flex-1"
              onChange={(e) => setPassConfirm(e.target.value)}
            />
            <span className="ml-4 w-4">
              {validConfirm && <IconCheck className="w-4 h-4" />}
            </span>
          </div>
        </section>
      </main>
    </Dialog>
  );
};

export default AuthPass;

const regexp = new RegExp("^[0-9A-Za-z_]{6,}$");