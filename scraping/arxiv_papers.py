import arxiv

client = arxiv.Client()
TOTAL_RESULTS = 100_000  # subject to change, temporary for now
date_format = "%Y-%m-%d %H:%M:%S"

def search(query, max_results=TOTAL_RESULTS, id=None, cat=None, recent=True, download=True, downloadPath="paper.pdf"):
  search = arxiv.Search(
    query = f'{"id:" + id + " AND " if id else ""}{"cat:" + cat + " AND " if cat else ""}{query}',
    max_results = max_results,
    sort_by = arxiv.SortCriterion.SubmittedDate if recent else arxiv.SortCriterion.Relevance
  )

  for r in client.results(search):
    data = {}
    data['id'] = r.get_short_id()
    data['title'] = r.title if r.title else ""
    data['authors'] = [a.name for a in r.authors if a.name] if r.authors else []
    data['categories'] = r.categories if r.categories else []
    data['comment'] = r.comment if r.comment else ""
    data['journal_ref'] = r.journal_ref if r.journal_ref else ""
    data['links'] = [{'title': l.title, 'href': l.href} for l in r.links if l.title and l.href] if r.links else []
    data['pdf_url'] = r.pdf_url if r.pdf_url else ""
    data['published'] = r.published.strftime(date_format) if r.published else ""
    data['updated'] = r.updated.strftime(date_format) if r.updated else ""
    data['summary'] = r.summary if r.summary else ""

    if download:
      r.download_pdf(filename=downloadPath)

    yield data



if __name__ == "__main__":
  results = search("artificial intelligence", max_results=2)
  for data in results:
    # do other stuff
    print(data['title'])