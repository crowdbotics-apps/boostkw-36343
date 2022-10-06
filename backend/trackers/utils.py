from .models import (InitialJobProcess, JobProcess)


def seconds_to_readable_time(seconds):
    seconds = seconds % (24 * 3600)
    hours = seconds // 3600
    seconds %= 3600
    minutes = seconds // 60
    seconds %= 60

    return {
        'hours': int(hours),
        'minutes': int(minutes),
        'left_seconds': int(seconds)
    }


def create_customer_tracker_job_process(instance, intial=False):
    if intial and instance.job_processes.count() < 1:
        initial_job_processes = InitialJobProcess.objects.filter(is_active=True, location=instance.location).order_by(
            'position')
        print(initial_job_processes)
        items = []
        for item in initial_job_processes:
            items.append(
                JobProcess(customer_tracker=instance, title=item.title, position=item.position,
                           is_active=item.is_active)
            )

        if len(items) > 0:
            try:
                JobProcess.objects.bulk_create(items, batch_size=len(items))
            except Exception as err:
                print(err)
                return None
        return None

    return None
