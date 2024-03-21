from fastapi import FastAPI
from pydantic import BaseModel

from src.producer import ProducerFactory

producer = ProducerFactory.create_producer("jobs")
app = FastAPI()


class Job(BaseModel):
    name: str
    description: str


@app.post("/publish")
def publish(job: Job):
    producer.publish(job.model_dump())

    return {"message": "Job published successfully!"}
