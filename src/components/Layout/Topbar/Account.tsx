import { Button } from "@/components/ui/button";
import {
  isTokenValidAction,
  signOutAction,
} from "@/lib/modules/auth/auth.action";
import { LogOut } from "lucide-react";
import Form from "next/form";

const Account = async () => {
  const data = await isTokenValidAction();

  return (
    <div className="flex items-center gap-2">
      <Form action={signOutAction}>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          className="border-none"
        >
          <span className="text-sm font-semibold">{data?.name}</span>
          <LogOut />
        </Button>
      </Form>
    </div>
  );
};

export default Account;
