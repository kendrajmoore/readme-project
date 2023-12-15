import { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";

function ReadmeCard({ id, repoName, description, tools, content, logo }) {
  return (
    <>
      <DisplayCard repoName={repoName} id={id} data={content} description={description}/>
    </>
  )
}

export default ReadmeCard