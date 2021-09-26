FROM nginx
COPY tool-set/dist/ /usr/share/nginx/html/
COPY nginx/toolset.conf /etc/nginx/conf.d/default.conf