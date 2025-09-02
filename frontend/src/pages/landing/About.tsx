import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <Link to={"/"}>
        <Button> home</Button>
      </Link>
    </div>
  );
}

export default About;
